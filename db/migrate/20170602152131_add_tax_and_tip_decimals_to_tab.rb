class AddTaxAndTipDecimalsToTab < ActiveRecord::Migration[5.0]
  def change
  	add_column :tabs, :tax_rate, :decimal, precision: 10, scale: 5, default: 0.0875
  	add_column :tabs, :tip_rate, :decimal, precision: 10, scale: 5, default: 0.18
  end
end
