class ThingTypeOfThingPolicy < ApplicationPolicy

  def create
    
  end

  def destroy

  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
