user = User.create({
	name: 'Andrew',
	email: 'aarcher520@gmail.com',
	phone_number: '415-555-5555',
	password: 'testdb'
})

tab = Tab.new(name: "Untitled Tab")
tab.items << Item.create(price: 0)
tab.user = user
tab.save!
