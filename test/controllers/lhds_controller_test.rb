require 'test_helper'

class LhdsControllerTest < ActionController::TestCase
  setup do
    @lhd = lhds(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lhds)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lhd" do
    assert_difference('Lhd.count') do
      post :create, lhd: { name: @lhd.name }
    end

    assert_redirected_to lhd_path(assigns(:lhd))
  end

  test "should show lhd" do
    get :show, id: @lhd
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lhd
    assert_response :success
  end

  test "should update lhd" do
    patch :update, id: @lhd, lhd: { name: @lhd.name }
    assert_redirected_to lhd_path(assigns(:lhd))
  end

  test "should destroy lhd" do
    assert_difference('Lhd.count', -1) do
      delete :destroy, id: @lhd
    end

    assert_redirected_to lhds_path
  end
end
