require 'bcrypt'

class User < ApplicationRecord
  validates :name, length: { in: 2..64 }
  validates :password, length: { minimum: 6, allow_blank: false }
  validates :phone_number, length: { minimum: 10, allow_blank: true }
  validates :email, uniqueness: true
  validates :email, presence: true
  validates :auth_token, uniqueness: true
  validates :password, presence: true
  has_many :rabbits
  has_many :tabs
  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def generate_authentication_token!
    begin
      self.auth_token = SecureRandom.hex
    end while self.class.exists?(auth_token: auth_token)
  end

  after_create do
    rabbit = Rabbit.create(name: name, email: email, phone_number: phone_number, user_id: self.id)
    self.avatar_rabbit_id = rabbit.id
    self.rabbits << rabbit
    generate_authentication_token!
    self.save!
  end
end
