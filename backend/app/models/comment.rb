class Comment < ApplicationRecord
  belongs_to :ticket
  belongs_to :user
  belongs_to :parent
end
