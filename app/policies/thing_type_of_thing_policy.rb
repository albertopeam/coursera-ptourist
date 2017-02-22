class ThingTypeOfThingPolicy < ApplicationPolicy

  def create
    puts "create"
    pp @user.inspect
    pp resource_organizer?
    @user && resource_organizer?
  end

  def destroy
    puts "destroy"
    @user && resource_organizer?
  end

  def resource_organizer?
    @user.has_role([Role::ORGANIZER], :Thing, @record.thing_id)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
