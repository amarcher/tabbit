class Api::V1::SessionsController < ApplicationController
  def create
    user_password = params['password']
    user_email = params['email']
    user = user_email.present? && User.find_by(email: user_email)

    if user && user.password == user_password
      user.generate_authentication_token!
      user.save!
      render json: user, only: [:id, :vm_authtoken, :auth_token]
    else
      render json: { errors: "Invalid email or password" }, status: 422
    end
  end

  def destroy
    auth_token = params[:id] || params[:auth_token]
    user = User.find_by(auth_token: auth_token)
    user.generate_authentication_token!
    user.save!
    render json: { ok: true }, status: 200
  end
end
