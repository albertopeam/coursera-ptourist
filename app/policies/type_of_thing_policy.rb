class TypeOfThingPolicy < ApplicationPolicy

  def index?
    @user
  end

  def show?
    @user
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
