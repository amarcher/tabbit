class Api::V1::RabbitsController < ApplicationController

def create
	user = current_user
	rabbit = Rabbit.new(name: params[:name], phone_number: params[:phone_number], email: params[:email])
	tab = Tab.find(params[:tab_id])
	rabbit.tabs << tab
	rabbit.user = user
	if rabbit.save
		content_type :json
		rabbit.to_json
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
		content_type :json
		rabbit.to_json
	else
		halt 400, rabbit.errors.to_json
	end
end

def edit
	rabbit = Rabbit.find(params[:rabbit_id])
	if rabbit.update_attributes(params)
		content_type :json
		rabbit.to_json
	else
		halt 400, rabbit.errors.to_json
	end
end

# remove the rabbit from the tab (but not from the DB!)
def remove_from_tab
	tab = Tab.find(params[:tab_id])
	rabbit = Rabbit.find(params[:rabbit_id])
	if tab && tab.rabbits.delete(rabbit)
		content_type :json
		{id: rabbit.id, name: rabbit.name}.to_json
	else
		halt 400, rabbit.errors.to_json
	end
end

# remove the rabbit entirely
def destroy
	rabbit = Tab.find(params[:rabbit_id])
	if rabbit.destroy
		204
	else
		halt 400, rabbit.errors.to_json
	end
end

end