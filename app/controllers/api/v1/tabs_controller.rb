class Api::V1::TabsController < ApplicationController
  include Authenticatable

  before_filter :authorize

  def index
    user = current_user
    tabs = current_user.tabs.sort_by(&:updated_at).reverse
    render json: tabs
  end

  def create
    tab = Tab.new(name: "Untitled Tab")
    tab.items << Item.create(price: 0)
    tab.user = current_user
    tab.rabbits << Rabbit.find(current_user.avatar_rabbit_id)
    tab.save!
    render json: tab
  end

  def edit
    tab_id = params[:id]
    tab = Tab.includes(:rabbits).includes(:items).find(tab_id)
    render json: tab
  end

  def update
    tab_id = params[:id]
    updated_items = params[:items]
    updated_tab = params[:tab]

    tab = Tab.includes(:items).find(tab_id)
    tab.update(name: updated_tab[:name])

    items = updated_items.map do |updated_item|
      updatedItem = updated_item.last
      item = Item.find(updated_item[:id])
      item.update(name: updated_item[:name], price: updated_item[:price])
      item
    end

    render json: { tab: tab, items: items }
  end
end

# def index
# 	if authenticated?
# 		@user = current_user
# 		@tabs = Tab.where(user_id: @user.id).order(id: :desc)
# 	else
# 		@tabs = nil
# 	end

# 	erb :home
# end

# # before * do
# # 	redirect '/login' unless authenticated?
# # end

# # get '/tab/:tab_id/totals' do
# # 	@user = current_user
# # 	@tab = Tab.includes(:items).find(params[:tab_id])
# # 	@rabbits = @tab.rabbits
# # 	@subtotal = @rabbits.map { |rabbit| rabbit.subtotal(@tab) }.reduce(:+)
# # 	erb :'tab/totals'
# # end


# def show
# 	content_type :json
# 	tab = Tab.includes(:rabbits).includes(:items).find(params[:tab_id])
# 	rabbits = tab.rabbits
# 	items = tab.items
# 	{tab: tab, rabbits: rabbits, items: items, item_owners: item_owners(items)}.to_json
# end

# def rename
# 	@tab = Tab.find(params[:id])
# 	content_type :json
# 	if @tab.update_attributes(name: params[:value])
# 		{id: @tab.id}.to_json
# 	else
# 		{errors: @tab.errors}.to_json
# 	end
# end

# def sms
# 	@user = current_user
# 	account_sid = ENV['TWILIOSID']
# 	auth_token = ENV['TWILIOAUTHTOKEN']

# 	@client = Twilio::REST::Client.new account_sid, auth_token

# 	body = "#{@user.name} requests payment of #{params[:total]}. See your tab online at http://#{request.host}/tab/#{params[:tab_id]}"
# 	@tab = Tab.find(params[:tab_id])

# 	unless @user.vm_authtoken.nil?
# 		# venmo_url = 'https://api.venmo.com/v1/payments'
# 		# res = HTTParty.post(url, body: { "access_token" => @user.vm_authtoken,
# 		# 	'audience' => 'friends',
# 		# 	'note' => "Our tab on Tabbit Rabbit",
# 		# 	'amount' => '-' + params[:total],
# 		# 	'phone' => params[:phone]})
# 		body += " Pay easily with Venmo: https://venmo.com/?txn=pay&recipients=#{@user.phone_number}&amount=#{params[:total]}&note=#{Rack::Utils.escape(@tab.name)}"
# 	end

# 	@client.account.messages.create({
# 		:from => '+18327722248',
# 		:to => params[:phone],
# 		:body => body
# 	})
# end

# def update
# 	if request.xhr?
# 		@tab = Tab.find(params[:tab_id])
# 		# {"items"=>{"16"=>["1"], "17"=>["21"]}, "splat"=>[], "captures"=>["18"], "tab_id"=>"18"}
# 		params['items'].each do |item_id, rabbits|
# 			item = Item.find(item_id.to_i)
# 			item.rabbits = rabbits.map{ |rabbit| Rabbit.find(rabbit.to_i) }
# 			item.save!
# 		end
# 		content_type :json
# 		tab = Tab.includes(:rabbits).includes(:items).find(params[:tab_id])
# 		rabbits = tab.rabbits
# 		items = tab.items.includes(:rabbits)
# 		{tab: tab, rabbits: rabbits, items: items}.to_json
# 	end
# end

# # post '/tab/newimage' do
# # 	@image = params[:image]
# # end

# # post '/twiliostatus' do
# # 	p request
# # 	p request.body
# # end

# def add_venmo
# 	url = "https://api.venmo.com/v1/oauth/authorize?client_id=#{ENV['VENMOID']}&scope=make_payments&response_type=code&redirect_uri=http://www.tabbitrabbit.com/venmo/#{current_user.id}/"
# 	redirect url
# end


# def remove_venmo
# 	@user = current_user
# 	@user.vm_authtoken = nil
# 	@user.vm_authrefreshtoken = nil
# 	@user.save
# 	redirect :index
# end

# end

# get '/venmo/:user_id/' do
# 	url = 'https://api.venmo.com/v1/oauth/access_token'
# 	res = HTTParty.post(url, body: { "client_id" => ENV['VENMOID'], "client_secret" => ENV['VENMOSECRET'], "code" => params[:code] })
# 	@user = User.find(params[:user_id])
# 	@user.vm_authtoken = res['access_token']
# 	@user.vm_authrefreshtoken = res['refresh_token']
# 	@user.save
# 	redirect '/'
# end

# post '/venmo' do
# 	p request
# end
