import axios from 'axios'
import './assets/css/bootstrap.css';
import './assets/css/main.css';

import React, { useEffect, useState, useRef } from "react"

function App() {
  const scrollerRef = useRef();

  const [images, setImages] = useState([])
  const [tabs, setTabs] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [imageId, setImageId] = useState('')

  const [selectedTab, setSelectedTab] = useState(false)
  const [fixedTab, setFixedTab] = useState(false)

  const [shown, setShown] = useState([])
  const [bookmarks, setBookMarks] = useState([])

  const [formLoading, setFormLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const getImages = async() => {
     await axios.get(`https://tourscanner.com/interview/images`)
    .then(function (response) {
      setImages(response.data)
    })
    setTabs(JSON.parse(localStorage.getItem('tab_list')))
    setBookMarks(JSON.parse(localStorage.getItem('bookmark_list')))
  }

  useEffect(() => {
    getImages()
  }, [])

  const getBookmarkedCount = async(image_id) => {
    setImageId(image_id);

    await axios.get(`https://tourscanner.com/interview/save_image/${image_id}`)
    .then(function (response) {
      const heroPlaceholder = document.querySelector('.bookmarked-before');
      heroPlaceholder.innerHTML = response.data

      setOpenModal(true)
    })
  }

  const saveBookmark = async() => {
    if(formLoading){
      return false
    }
    const input_value = document.querySelector('.folder_input').value
    const main_button = document.querySelector('.btn-main')
    setFormLoading(true)
    setIsError(null)

    await axios.post(`https://tourscanner.com/interview/save_image/${imageId}`)
    .then(function (response) {
      setFormLoading(false)
      if(response.data.success){
        let bookmark_values = JSON.parse(localStorage.getItem('bookmark_list'))
  
        let get_current_folder = JSON.parse(localStorage.getItem(input_value))
  
        let tab_values = JSON.parse(localStorage.getItem('tab_list'))
  
        localStorage.setItem('bookmark_list', JSON.stringify([...(bookmark_values ? bookmark_values : []), ...[imageId]]))
        localStorage.setItem(input_value, JSON.stringify([...(get_current_folder ? get_current_folder : []), ...[imageId]]))
  
        if(!tab_values||!tab_values.includes(input_value)){
          localStorage.setItem('tab_list', JSON.stringify([...(tab_values ? tab_values : []), ...[input_value]]))
        }
  
        setTabs(JSON.parse(localStorage.getItem('tab_list')))
        setBookMarks(JSON.parse(localStorage.getItem('bookmark_list')))
  
        document.querySelector('.folder_input').value = ""
        main_button.setAttribute('data-id', '');
  
        setOpenModal(false)
      }else{
        setIsError('Your request couldn\'t be received.')
      }
    })
  }

  useEffect(() => {
    if(selectedTab){
      let selected_tab_values = JSON.parse(localStorage.getItem(selectedTab))
      setShown(selected_tab_values)
    }else{
      setShown([])
    }
  }, [selectedTab])

  const scrollBottom = () => {
    if (scrollerRef.current) {
      const { scrollTop } = scrollerRef.current;
      if (scrollTop > 200) {
        setFixedTab(true)
      }else{
        setFixedTab(false)
      }
    }
  };

  return (
      <section className="tourscanner-gallery"
        onScroll={scrollBottom}
        ref={scrollerRef}>
        <div className="container-fluid">
          <div className="tab-wrapper">
            <div className={`tab-side ${fixedTab ? 'fixed' : ''}`}>
              <div className={`filter-tab ${!selectedTab ? 'selected' : ''}`} onClick={() => setSelectedTab(false)}>
                Show All
              </div>
              {tabs.map((item, i) => (
                <div className={`filter-tab ${selectedTab===item ? 'selected' : ''}`} onClick={() => setSelectedTab(item)} key={i}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="gallery-row">
            {images.map((item, i) => (
              <div className={`gallery-card ${bookmarks.includes(item.image_id) ? 'bookmarked' : ''} ${!shown.length||shown.includes(item.image_id) ? '' : 'd-none'}`} key={i}>
                <div className="image-block" onClick={() => bookmarks.includes(item.image_id) ? '' : getBookmarkedCount(item.image_id)}>
                  <img src={item.url} alt={item.title} className="img-fluid" />
                </div>
                <div className={`description-block`}>
                  <div className="left-arrow">
                    <i className="fa fa-angle-right"></i>
                  </div>
                  <div className="right-side">
                    {item.title}
                  </div>
                </div>
              </div>
              )
            )}
          </div>
        </div>
      <div className={`bookmark-modal ${openModal ? 'active' : ''}`}>
        <div className="bookmark-background" onClick={() => {
          setOpenModal(false)
          setIsError(null)
        }}></div>
        <div className="bookmark-card">
          <p>Which folder would you wish to save your images?</p>
            <div className="bookmark-form">
              <input type="text" className="form-control solid folder_input" />
              <button className={`btn btn-main ${formLoading ? 'loading' : ''}`} data-id={imageId} onClick={() => saveBookmark()}>
                <i className="fa fa-long-arrow-right"></i>
                <div className="loader"></div>
              </button>
            </div>
            {isError ? 
            <div className={`bookmark-answer`}>{isError}</div> : ''}
            <hr />
          <div className="bookmarked-bottom">
            This images was bookmarked <strong className="bookmarked-before"></strong> times before.
          </div>
        </div>
      </div>
      </section>
    
  );
}

export default App;
