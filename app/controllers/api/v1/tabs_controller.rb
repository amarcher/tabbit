class Api::V1::TabsController < ApplicationController
  include Authenticatable

  before_action :authorize

  def index
    user = current_user
    tabs = current_user.tabs.sort_by(&:updated_at).reverse
    render json: tabs
  end

  def show
    tab = Tab.includes(:rabbits).includes(:items).find(params[:id])
    render json: tab, :include => {
      :items => {
        :include => {
          :rabbits => {
            :only => :id
          }
        }
      },
      :rabbits => {}
    }
  end

  def create
    tab = Tab.new(name: "Untitled Tab")
    tab.user = current_user
    tab.rabbits << Rabbit.find(current_user.avatar_rabbit_id)
    tab.save!
    render json: tab
  end

  def edit
    tab_id = params[:id]
    tab = Tab.includes(:rabbits).includes(:items).find(tab_id)
    render json: tab, :include => {
      :items => {
        :include => {
          :rabbits => {
            :only => :id
          }
        }
      },
      :rabbits => {}
    }
  end

  def update
    tab = current_user.tabs.find(params[:id])

    if !tab
      render json: "Unauthorized", status: 400
    end

    tab.update_attributes!(tab_params)

    render json: tab, :include => {
      :items => {
        :include => {
          :rabbits => {
            :only => :id
          }
        }
      },
      :rabbits => {}
    }
  end

  private

    def tab_params
      params.require(:tab).permit(:name, :items, :rabbits, :tax_rate, :tip_rate, :dine_date, :text)
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

# end


# post '/venmo' do
# 	p request
# end
