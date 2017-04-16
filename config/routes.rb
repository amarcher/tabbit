Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			resources :tabs, only: [:index, :create, :show, :update] do
				delete 'rabbit', to: 'rabbit#remove_from_tab'
			end
			resources :rabbits, only: [:create, :update, :edit, :destroy]
			post 'login', to: 'users#login'
			post 'user/create', to: 'users#create'
			post 'logout', to: 'users#logout'
		end
	end
end