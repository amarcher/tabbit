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
  user_params = Hash[params[:user].map { |k,v| [k.to_sym, v] } ]
  session[:user] = user_params
  @user = User.new(params[:user])
  @user.password = params[:password]
  if @user.save
    session[:user] = nil
    session[:user_id] = @user.id
    redirect '/'
  else
    session[:errors] = @user.errors
    redirect '/users/new'
  end
end

def logout
  session[:user_id] = nil
  redirect '/login'
end

end