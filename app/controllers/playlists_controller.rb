class PlaylistsController < ApplicationController
  include Appscript
  
  def index
    @playlists = app("/Applications/iTunes.app").playlists.name.get[4..100]
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
end
