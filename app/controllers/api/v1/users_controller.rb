class Api::V1::UsersController < ApplicationController

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
    render json: @user, status: 200
  else
    render json: { errors: "Could not create user" }, status: 422
  end
end

def logout
  session[:user_id] = nil
  redirect '/login'
end

end