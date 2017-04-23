user = User.new({
	name: 'Andrew',
	email: 'aarcher520@gmail.com',
	phone_number: '415-555-5555',
})

user.password = 'testdb'
user.save!

rabbit = Rabbit.new({
	name: 'Andrew',
	email: 'aarcher520@gmail.com',
	phone_number: '415-555-5555',
})

rabbit.user = user
rabbit.save!

tab = Tab.new(name: "Untitled Tab")
tab.items << Item.create(price: 0)
tab.user = user
tab.rabbits << rabbit
tab.save!
