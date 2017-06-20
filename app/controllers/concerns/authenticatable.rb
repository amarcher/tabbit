module Authenticatable
	def current_user
		@user ||= User.find_by(auth_token: request.headers['Authorization'])
	end

	def authorize
		render json: { errors: "Unauthorized" }, status: 401 unless current_user
	end
end
