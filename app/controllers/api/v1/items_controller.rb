class Api::V1::ItemsController < ApplicationController
  def create
    tab_id = params['tab_id']
    item = Item.new(name: params['item']['name'], price: params['item']['price'], tab_id: tab_id)
    if item.save!
      render json: item
    end
  end
end
