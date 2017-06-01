class ChangeItemPriceToDecimal < ActiveRecord::Migration[5.0]
	def change
  		change_column :items, :price, :decimal, precision: 256, scale: 2
	end
end
