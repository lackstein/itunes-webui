class AlbumsController < ApplicationController
  include Appscript
  
  def index
    @albums = app("/Applications/iTunes.app").playlists[2].tracks.album.get.sort.uniq
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
  
  def artist
    @albums = app("/Applications/iTunes.app").playlists[2].tracks[its.artist.eq(params[:search])].album.get.sort.uniq
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
end
