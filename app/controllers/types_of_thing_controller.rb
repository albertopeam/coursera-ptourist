class TypesOfThingController < ApplicationController

  before_action :set_type_of_thing, only: [:show, :update, :destroy]

  def index
    @types_of_thing = TypeOfThing.all
  end

  def show
  end

  def update
  end

  def destroy
  end

  private
    def set_type_of_thing
      @type_of_thing = TypeOfThing.find(params[:id])
    end

end
