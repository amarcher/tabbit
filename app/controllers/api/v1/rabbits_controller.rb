class Api::V1::RabbitsController < ApplicationController
include Authenticatable

before_action :authorize

def index
	user = current_user
	rabbits = current_user.rabbits.sort_by(&:updated_at).reverse
	render json: rabbits
end

def create
	user = current_user
	rabbit = Rabbit.new(name: params[:name], phone_number: params[:phone_number], email: params[:email])
	if (params[:tab_id])
		tab = Tab.find(params[:tab_id])
		rabbit.tabs << tab
	end
	rabbit.user = user
	if rabbit.save!
		puts 'rabbit'
		p rabbit
		puts 'tab'
		p tab
		if tab
			render json: {rabbit: rabbit, tab_id: tab.id}
		else
			render json: rabbit
		end
	else
		halt 400, rabbit.errors.to_json
	end
end

def update
	user = current_user
	tab = Tab.find(params[:tab_id])
	rabbit = Rabbit.find(params[:rabbit])
	rabbit.tabs << tab
	if rabbit.save
		render json: rabbit
	else
		halt 400, rabbit.errors.to_json
	end
end

def edit
	rabbit = Rabbit.find(params[:rabbit_id])
	if rabbit.update_attributes(params)
		render json: rabbit
	else
		halt 400, rabbit.errors.to_json
	end
end

# remove the rabbit from the tab (but not from the DB!)
def add_to_tab
	tab = Tab.find(params[:tab_id])
	rabbit = Rabbit.find(params[:id])
	tab.rabbits << rabbit
	if tab.save!
		render json: { rabbit: rabbit, tab_id: tab.id }
	else
		halt 400, rabbit.errors.to_json
	end
end

# remove the rabbit from the tab (but not from the DB!)
def remove_from_tab
	tab = Tab.includes(:items).find(params[:tab_id])
	rabbit = Rabbit.find(params[:id])
	tab.items.each do |item|
		item.rabbits.delete(rabbit)
	end
	if tab && tab.rabbits.delete(rabbit.id)
		render json: { id: rabbit.id, tab_id: tab.id }
	else
		halt 400, tab.errors.to_json
	end
end

# remove the rabbit entirely
def destroy
	rabbit = Rabbit.find(params[:rabbit_id])
	if rabbit.destroy
		render json: { id: rabbit.id }
	else
		halt 400, rabbit.errors.to_json
	end
end

def charge_rabbit
	tab = current_user.tabs.find(params[:tab_id])
	if tab
		rabbit = tab.rabbits.find(params[:id])
		if rabbit
			res = charge({
				phone: rabbit.phone_number,
				note: tab.name,
				amount: params[:amount] || amount_for_rabbit(tab, rabbit),
				auth_token: current_user.vm_authtoken
			})

			if res
				render json: { ok: true }
			end
		end
	end
end

private

def charge(args)
	url = 'https://api.venmo.com/v1/payments'
	HTTParty.post(url, body: {
		"client_id" => ENV['VENMOID'],
		"client_secret" => ENV['VENMOSECRET'],
		"phone" => args[:phone],
		"note" => args[:note],
		"amount" => "-#{args[:amount]}",
		"audience" => "public",
		"access_token" => args[:auth_token]
	})
end

def amount_for_rabbit(tab, rabbit)
	tab.items.inject do |total, item|
		total + (1.0 * item.price) / (1.0 * item.rabbits.length)
	end
end

end