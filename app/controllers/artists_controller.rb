class ArtistsController < ApplicationController
  include Appscript
  
  def index
    @artists = app("/Applications/iTunes.app").playlists[2].tracks.artist.get.sort.uniq!
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
end
