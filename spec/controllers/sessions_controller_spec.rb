require 'rails_helper'
require 'json'

RSpec.describe Api::V1::SessionsController, type: :controller do
  let(:user) do
    User.new(
      name: 'Andrew',
      email: 'aarcher520@gmail.com',
      phone_number: '415-555-5555',
      password: '12345678'
    )
  end

  before :each do
    user.save!
  end

  after :each do
    user.destroy
  end

  describe "POST #create" do
    context "with correct credentials" do
      let(:credentials) { { 'email': user.email, 'password': '12345678' } }

      it "returns the user record corresponding to the given credentials" do
        post :create, params: credentials
        user.reload
        expect(JSON.parse(response.body, symbolize_names: true)[:auth_token]).to eq user.auth_token
      end

      it 'responds with success' do
        post :create, params: credentials
        expect(response.status).to eq 200
      end
    end

    context "when the credentials are incorrect" do
      let(:credentials) { { 'email': user.email, 'password': 'invalidpassword' } }

      it "returns a json with an error" do
        post :create, params: credentials
        expect(JSON.parse(response.body, symbolize_names: true)[:errors]).to eq "Invalid email or password"
      end

      it 'responds with failure' do
        post :create, params: credentials
        expect(response.status).to eq 422
      end
    end
  end

  describe "DELETE #destroy" do
    it 'should respond with 200' do
      delete :destroy, params: { id: user.auth_token }
      expect(response.status).to eq 200
    end
  end
end
