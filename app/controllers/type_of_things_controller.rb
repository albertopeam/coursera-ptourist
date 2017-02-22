class TypeOfThingsController < ApplicationController

  before_action :set_type_of_thing, only: [:show]
  after_action :verify_authorized

  def index
    authorize(TypeOfThing)
    @types_of_thing = TypeOfThing.all
  end

  def show
    authorize(@type_of_thing)
  end

  private
    def set_type_of_thing
      @type_of_thing = TypeOfThing.find(params[:id])
    end

end
