class LhdsController < ApplicationController
  before_action :set_lhd, only: [:show, :edit, :update, :destroy]

  # GET /lhds
  # GET /lhds.json
  def index
    @lhds = Lhd.all
  end

  # GET /lhds/1
  # GET /lhds/1.json
  def show
  end

  # GET /lhds/new
  def new
    @lhd = Lhd.new
  end

  # GET /lhds/1/edit
  def edit
  end

  # POST /lhds
  # POST /lhds.json
  def create
    @lhd = Lhd.new(lhd_params)

    respond_to do |format|
      if @lhd.save
        format.html { redirect_to @lhd, notice: 'Lhd was successfully created.' }
        format.json { render action: 'show', status: :created, location: @lhd }
      else
        format.html { render action: 'new' }
        format.json { render json: @lhd.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lhds/1
  # PATCH/PUT /lhds/1.json
  def update
    respond_to do |format|
      if @lhd.update(lhd_params)
        format.html { redirect_to @lhd, notice: 'Lhd was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @lhd.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lhds/1
  # DELETE /lhds/1.json
  def destroy
    @lhd.destroy
    respond_to do |format|
      format.html { redirect_to lhds_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lhd
      @lhd = Lhd.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lhd_params
      params.require(:lhd).permit(:name, :long_name)
    end
end
