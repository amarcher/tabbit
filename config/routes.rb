Rails.application.routes.draw do
	get '/venmo/:user_id/', to: 'venmo#venmo_webhook'
	delete 'user/venmo', to: 'venmo#remove_venmo'

	namespace :api do
		namespace :v1 do
			resources :tabs, only: [:index, :create, :show, :update] do
				resources :items, only: [:create, :destroy, :update]
				delete 'rabbits/:id', to: 'rabbits#remove_from_tab'
				post 'rabbits/:id/charge', to: 'rabbits#charge_rabbit'
				post 'rabbits/:id', to: 'rabbits#add_to_tab'
			end
			resources :rabbits, only: [:create, :update, :edit, :destroy, :index]
			post 'user/create', to: 'users#create'
			get 'user', to: 'users#show'
			resources :sessions, only: [:create, :destroy]
		end
	end
end
