class Api::V1::UsersController < ApplicationController
  include Authenticatable

  def show
      render json: current_user, only: [:id, :vm_authtoken, :auth_token]
  end

  def login
    session[:email] = params[:email]
    @user = User.find_by(email: params[:email])
    if @user.nil?
      session[:errors] = {email: "No account with that username"}
      redirect '/login'
    elsif @user.password == params[:password]
      session[:email] = nil
      session[:user_id] = @user.id
      redirect '/'
    else
      session[:errors] = {password: "Incorrect Password"}
      redirect '/login'
    end
  end

  def create
    @user = User.new(name: params['name'], phone_number: params['phone'], email: params['email'])
    @user.password = params['password']
    if @user.save!
      @user.generate_authentication_token!
      @user.save!
      render json: @user, only: [:id, :vm_authtoken, :auth_token], status: 200
    else
      render json: { errors: "Could not create user" }, status: 422
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to '/login'
  end

  def add_venmo
    p request.host_with_port
    url = "https://api.venmo.com/v1/oauth/authorize?client_id=#{ENV['VENMOID']}&scope=make_payments%20access_profile%20access_email%20access_phone%20access_balance&response_type=code&redirect_uri=http://www.tabbitrabbit.com/venmo/#{current_user.id}/"
    redirect_to url
  end

  def remove_venmo
    current_user.vm_authtoken = nil
    current_user.vm_authrefreshtoken = nil
    current_user.save!
    render json: current_user, only: [:id, :auth_token, :vm_authtoken]
  end

  def venmo_webhook
    url = 'https://api.venmo.com/v1/oauth/access_token'
    res = HTTParty.post(url, body: { "client_id" => ENV['VENMOID'], "client_secret" => ENV['VENMOSECRET'], "code" => params[:code] })
    user = User.find(params[:user_id])
    user.vm_authtoken = res['access_token']
    user.vm_authrefreshtoken = res['refresh_token']
    user.save!
  end

end