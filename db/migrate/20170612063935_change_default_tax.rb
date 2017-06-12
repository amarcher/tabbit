class ChangeDefaultTax < ActiveRecord::Migration[5.0]
  def change
  	change_column :tabs, :tax_rate, :decimal, precision: 10, scale: 5, default: 0.085
  end
end
