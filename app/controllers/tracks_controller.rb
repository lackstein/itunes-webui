class TracksController < ApplicationController
  include Appscript
  
  def playlist
    @tracks = app('iTunes').playlists[params[:search]].tracks.name.get.sort
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
  
  def artist
    @tracks = app('iTunes').playlists[2].tracks[its.artist.eq(params[:search])].name.get.sort
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
  
  def album
    @tracks = app('iTunes').playlists[2].tracks[its.album.eq(params[:search])].name.get.sort
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
  
  def info
    @track = app('iTunes').playlists[2].tracks[its.name.eq(params[:search])].get[0]
    @name = @track.name.get
    @time = @track.time.get
    @album = @track.album.get
    @year = @track.year.get
    @artist = @track.artist.get
    @rating = @track.rating.get / 20
    @genre = @track.genre.get
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @posts }
    end
  end
end
