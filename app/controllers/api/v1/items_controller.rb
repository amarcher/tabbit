class Api::V1::ItemsController < ApplicationController
  include Authenticatable

  before_action :authorize

  def create
    tab_id = params['tab_id']
    tab = Tab.find(tab_id)
    if tab && tab.user_id == current_user.id
      item = Item.new(name: params['item']['name'], price: params['item']['price'].to_f, tab_id: tab_id)
      if item.save!
        render json: item, :include => {
          :rabbits => {
            :only => :id
          }
        }
      end
    end
  end

  def destroy
    tab_id = params['tab_id']
    item_id = params['id']
    tab = Tab.find(tab_id)
    if tab && tab.user_id == current_user.id
      item = Item.find(item_id)
      if item.destroy
        render json: item, :include => {
          :rabbits => {
            :only => :id
          }
        }
      end
    end
  end

  def update
    tab_id = params['tab_id']
    item_id = params['id']
    rabbit_id = params['rabbit_id']
    remove = params['remove']
    tab = Tab.find(tab_id)
    item = Item.includes(:rabbits).find(item_id)
    rabbit = Rabbit.find(rabbit_id)

    if tab && tab.user_id == current_user.id && tab.items.include?(item) && tab.rabbits.include?(rabbit)
      if item.rabbit_ids.include?(rabbit_id)
        if remove
          item.rabbits.delete(rabbit)
        end
      else
        item.rabbits << rabbit
      end

      if item.save!
        render json: item, :include => {
          :rabbits => {
            :only => :id
          }
        }
        return
      end

      render json: item.errors
    end
  end
end
