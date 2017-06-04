class VenmoController < ApplicationController
	include Authenticatable

	def add_venmo
		url = "https://api.venmo.com/v1/oauth/authorize?client_id=#{ENV['VENMOID']}&scope=make_payments%20access_profile%20access_email%20access_phone%20access_balance&response_type=code&redirect_uri=http://www.tabbitrabbit.com/venmo/#{current_user.id}/"
		redirect_to url
	end

	def venmo_webhook
		url = 'https://api.venmo.com/v1/oauth/access_token'
		res = HTTParty.post(url, body: { "client_id" => ENV['VENMOID'], "client_secret" => ENV['VENMOSECRET'], "code" => params[:code] })
		user = User.find(params[:user_id])
		user.vm_authtoken = res['access_token']
		user.vm_authrefreshtoken = res['refresh_token']
		if user.save!
			render html: "<script type='text/javascript'>"\
					"window.opener.postMessage('#{user.to_json( only: [:id, :vm_authtoken, :auth_token])}', '*');"\
				"</script>".html_safe
		end
	end
end
