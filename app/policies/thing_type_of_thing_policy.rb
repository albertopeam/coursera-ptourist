class ThingTypeOfThingPolicy < ApplicationPolicy

  def create?
    byebug
    @user && resource_organizer?
  end

  def destroy?
    byebug
    @user && resource_organizer?
  end

  def resource_organizer?
    byebug
    @user.has_role([Role::ORGANIZER], Thing)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
