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
	tab = Tab.find(params[:tab_id])
	rabbit = Rabbit.find(params[:id])
	if tab && tab.rabbits.delete(rabbit.id)
		render json: { id: rabbit.id, tab_id: tab.id }
	else
		halt 400, tab.errors.to_json
	end
end

# remove the rabbit entirely
def destroy
	rabbit = Tab.find(params[:rabbit_id])
	if rabbit.destroy
		render json: { id: rabbit.id }
	else
		halt 400, rabbit.errors.to_json
	end
end

end