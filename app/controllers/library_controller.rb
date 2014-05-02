class LibraryController < ApplicationController
  include Appscript
  
  def index
  end
  
  def list
    @names = app('iTunes').playlists[2].tracks.name.get.sort.uniq
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
end
