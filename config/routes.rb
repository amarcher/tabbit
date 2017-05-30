Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			resources :tabs, only: [:index, :create, :show, :update] do
				resources :items, only: [:create, :destroy, :update]
				delete 'rabbits/:id', to: 'rabbits#remove_from_tab'
				post 'rabbits/:id', to: 'rabbits#add_to_tab'
			end
			resources :rabbits, only: [:create, :update, :edit, :destroy, :index]
			post 'user/create', to: 'users#create'
			resources :sessions, only: [:create, :destroy]
		end
	end
end