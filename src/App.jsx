import React, { useState } from 'react';
import coursesData from './courseData';

function App() {
  const [modalCourse, setModalCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseLevels, setCourseLevels] = useState([]);
  const [creditHours, setCreditHours] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [coursesPerPage, setCoursesPerPage] = useState(21);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [showCore, setShowCore] = useState(false);

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const [showFavorites, setShowFavorites] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setCourseLevels([]);
    setCreditHours([]);
    setSemesters([]);
    setShowFavorites(false);
    setShowCore(false);
    setSortOrder('asc');
    setCurrentPage(1);
    setCoursesPerPage(21);
    setShowAllCourses(false);
  }

  const toggleCourseLevel = (level) => {
    setCourseLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
    setCurrentPage(1);
  }

  const toggleCreditHour = (credit) => {
    setCreditHours(prev => {
      if (prev.includes(credit)) {
        return prev.filter(c => c !== credit);
      } else {
        return [...prev, credit];
      }
    });
    setCurrentPage(1);
  }

  const toggleSemester = (sem) => {
    setSemesters(prev => {
      if (prev.includes(sem)) {
        return prev.filter(s => s !== sem);
      } else {
        return [...prev, sem];
      }
    });
    setCurrentPage(1);
  }

  const removeFilterPill = (type, value) => {
    if (type === 'level') {
      setCourseLevels(prev => prev.filter(level => level !== value));
    } else if (type === 'credit') {
      setCreditHours(prev => prev.filter(credit => credit !== value));
    } else if (type === 'semester') {
      setSemesters(prev => prev.filter(sem => sem !== value));
    } else if (type === 'core') {
      setShowCore(false);
    } else if (type === 'favorites') {
      setShowFavorites(false);
    } else if (type === 'search') {
      setSearchTerm('');
    }
    setCurrentPage(1);
  };

  const filteredCourses = coursesData
    .filter((course) => {
      const levelMatch = courseLevels.length === 0 || 
        courseLevels.some(level => 
          Math.floor(parseInt(course.header.match(/\d+/)[0]) / 100) * 100 === parseInt(level)
        );
      
      const creditMatch = creditHours.length === 0 || 
        creditHours.includes(course.credits.toString());
      
      const semesterMatch = semesters.length === 0 || 
        semesters.some(sem => course.semesters.includes(sem));
      
      const searchMatch =
        course.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const favoritesMatch = !showFavorites || favorites.includes(course.id);
      const coreMatch = !showCore || course.isCore;

      return (
        levelMatch && creditMatch && semesterMatch && searchMatch && favoritesMatch && coreMatch
      );
    })
    .sort((a, b) => {
      const levelA = parseInt(a.header.match(/\d+/)[0]);
      const levelB = parseInt(b.header.match(/\d+/)[0]);

      if (sortOrder === 'asc') {
        return levelA - levelB;
      } else {
        return levelB - levelA;
      }
    });

  const totalPages = showAllCourses ? 1 : Math.ceil(filteredCourses.length / coursesPerPage);
  const displayedCourses =
    showFavorites && favorites.length === 0
      ? []
      : showAllCourses 
        ? filteredCourses
        : filteredCourses.slice(
            (currentPage - 1) * coursesPerPage,
            currentPage * coursesPerPage
          );

  const toggleFavorite = (courseId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(courseId)) {
        return currentFavorites.filter((id) => id !== courseId);
      } else {
        return [...currentFavorites, courseId];
      }
    });
  };

  const openModal = (course) => setModalCourse(course);
  const closeModal = () => setModalCourse(null);

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to the first page
  };

  const handleFavoriteChange = (newShowFavorites) => {
    setShowFavorites(newShowFavorites);
    setCurrentPage(1); // Reset to the first page
  };

  const handleCoreChange = (newShowCore) => { 
    setShowCore(newShowCore);
    setCurrentPage(1); // Reset to the first page
  };

  const handleCoursesPerPageChange = (event) => {
    const value = event.target.value;
    if (value === 'all') {
      setShowAllCourses(true);
    } else {
      setShowAllCourses(false);
      setCoursesPerPage(parseInt(value));
    }
    setCurrentPage(1); // Reset to the first page
  };

  // Get all unique credit hours for multi-select
  const uniqueCreditHours = [...new Set(coursesData.map(c => c.credits))].sort();

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1>BYU CS Courses</h1>
            <p className="subtitle">Explore undergraduate Computer Science courses</p>
            <p className="results-count">
              Showing {displayedCourses.length} of {filteredCourses.length} courses
            </p>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-button" onClick={() => setSearchTerm('')}>
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="three-column-layout">
        <aside className="filters-sidebar">
          <div className="filters">
            <div className="filter-group">
              <label>Course Level</label>
              <div className="checkbox-group">
                {[100, 200, 300, 400].map(level => (
                  <div key={level} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`level-${level}`}
                      checked={courseLevels.includes(level.toString())}
                      onChange={() => toggleCourseLevel(level.toString())}
                    />
                    <label htmlFor={`level-${level}`}>{level} Level</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Credit Hours</label>
              <div className="checkbox-group">
                {uniqueCreditHours.map(credit => (
                  <div key={credit} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`credit-${credit}`}
                      checked={creditHours.includes(credit.toString())}
                      onChange={() => toggleCreditHour(credit.toString())}
                    />
                    <label htmlFor={`credit-${credit}`}>{credit} credit{credit !== 1 ? 's' : ''}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Semester</label>
              <div className="checkbox-group">
                {['F', 'W', 'SP', 'SU'].map(sem => (
                  <div key={sem} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`semester-${sem}`}
                      checked={semesters.includes(sem)}
                      onChange={() => toggleSemester(sem)}
                    />
                    <label htmlFor={`semester-${sem}`}>
                      {sem === 'F' ? 'Fall' : sem === 'W' ? 'Winter' : sem === 'SP' ? 'Spring' : 'Summer'}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Show Favorites</label>
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={() => handleFavoriteChange(!showFavorites)}
              />
            </div>

            <div className="filter-group">
              <label>Show Core Classes</label>
              <input
                type="checkbox"
                checked={showCore}
                onChange={() => handleCoreChange(!showCore)}
              />
            </div>

            <div className="filter-group">
              <button className="reset-button" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        <main className="courses-container">
          {/* Active Filter Pills */}
          {(searchTerm || courseLevels.length > 0 || creditHours.length > 0 || semesters.length > 0 || showCore || showFavorites) && (
            <div className="active-filters">
              {searchTerm && (
                <div className="filter-pill">
                  <span>Search: {searchTerm}</span>
                  <button onClick={() => removeFilterPill('search', searchTerm)}>×</button>
                </div>
              )}
              
              {courseLevels.map(level => (
                <div className="filter-pill" key={`pill-level-${level}`}>
                  <span>{level} Level</span>
                  <button onClick={() => removeFilterPill('level', level)}>×</button>
                </div>
              ))}
              
              {creditHours.map(credit => (
                <div className="filter-pill" key={`pill-credit-${credit}`}>
                  <span>{credit} Credit{credit !== '1' ? 's' : ''}</span>
                  <button onClick={() => removeFilterPill('credit', credit)}>×</button>
                </div>
              ))}
              
              {semesters.map(sem => (
                <div className="filter-pill" key={`pill-semester-${sem}`}>
                  <span>
                    {sem === 'F' ? 'Fall' : sem === 'W' ? 'Winter' : sem === 'SP' ? 'Spring' : 'Summer'}
                  </span>
                  <button onClick={() => removeFilterPill('semester', sem)}>×</button>
                </div>
              ))}
              
              {showCore && (
                <div className="filter-pill">
                  <span>Core Classes</span>
                  <button onClick={() => removeFilterPill('core')}>×</button>
                </div>
              )}
              
              {showFavorites && (
                <div className="filter-pill">
                  <span>Favorites</span>
                  <button onClick={() => removeFilterPill('favorites')}>×</button>
                </div>
              )}
            </div>
          )}

          <div className="pagination-controls">
            <div className="courses-per-page">
              <label htmlFor="coursesPerPage">Show:</label>
              <select 
                id="coursesPerPage" 
                value={showAllCourses ? 'all' : coursesPerPage} 
                onChange={handleCoursesPerPageChange}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="all">All</option>
              </select>
            </div>
            
            {!showAllCourses && (
              <div className="pagination top-pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
            
            <div className="sort-control">
              <label htmlFor="sortOrder">Sort:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => handleSortOrderChange(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          
          <div className="courses-scroll">
            <div className="courses-grid">
              {showFavorites && favorites.length === 0 ? (
                <div className="no-favorites-message">NO FAVORITES SELECTED</div>
              ) : (
                displayedCourses.map((course) => (
                  <div className="course-card" key={course.id}>
                    <div className="card-header">
                      <h2>
                        {course.header}
                        {course.isCore && <span className="core-badge">Core</span>}
                      </h2>
                      <button
                        className={`favorite-button ${
                          favorites.includes(course.id) ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavorite(course.id)}
                      >
                        {favorites.includes(course.id) ? '★' : '☆'}
                      </button>
                    </div>
                    <div className="credit-spacing">
                      <span className="credits">{course.credits} credits</span>
                    </div>
                    <h4>{course.title}</h4>
                    <p className="description">{course.description.substring(0, 120)}...</p>
                    <div className="semester-badges">
                      {course.semesters.map((sem, idx) => (
                        <span key={idx} className={`semester ${sem}`}>
                          {sem}
                        </span>
                      ))}
                    </div>
                    <button className="more-button" onClick={() => openModal(course)}>
                      Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {!showAllCourses && (
            <div className="pagination bottom-pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>

        <aside className="major-outline-sidebar">
          <div className="major-outline">
            <h2>CS Major Outline</h2>
            
            <div className="outline-section">
              <h3>Core Requirements</h3>
              <ul className="requirement-list">
                {coursesData.filter(course => course.isCore).map(course => (
                  <li key={course.id} className={favorites.includes(course.id) ? 'favorited-course' : ''}>
                    <span className="course-code">{course.header}</span>
                    <span className="course-title">{course.title}</span>
                    <span className="course-credits">({course.credits} cr)</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="outline-section">
              <h3>Degree Progress</h3>
              <div className="progress-container">
                <div className="progress-info">
                  <div className="progress-label">Core Courses</div>
                  <div className="progress-value">
                    {coursesData.filter(c => c.isCore && favorites.includes(c.id)).length} / {coursesData.filter(c => c.isCore).length}
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(coursesData.filter(c => c.isCore && favorites.includes(c.id)).length / coursesData.filter(c => c.isCore).length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="total-credits">
                <h4>Credit Summary</h4>
                <div className="credits-container">
                  <p><strong>Favorited Credits:</strong> {coursesData.filter(c => favorites.includes(c.id)).reduce((sum, course) => sum + course.credits, 0)}</p>
                  <p><strong>Total Required:</strong> 120</p>
                </div>
              </div>
            </div>
            
            <div className="outline-section">
              <h3>Graduation Requirements</h3>
              <div className="requirement-card">
                <h4>Course Distribution</h4>
                <ul>
                  <li>Core CS Courses: 30 credits</li>
                  <li>CS Electives: 15 credits</li>
                  <li>Math & Science: 20 credits</li>
                  <li>General Education: 40 credits</li>
                  <li>Free Electives: 15 credits</li>
                </ul>
              </div>
              
              <div className="requirement-card">
                <h4>Capstone Requirement</h4>
                <p>Complete CS 494 & CS 495 in consecutive semesters.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {modalCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-inner-content">
              <h2>
                {modalCourse.header}: {modalCourse.title}
                {modalCourse.isCore && <span className="core-badge">Core</span>}
              </h2>
              <button
                className={`favorite-button ${
                  favorites.includes(modalCourse.id) ? 'favorited' : ''
                }`}
                onClick={() => toggleFavorite(modalCourse.id)}
              >
                {favorites.includes(modalCourse.id) ? '★ Unfavorite' : '☆ Favorite'}
              </button>
              <p className="modal-description">{modalCourse.description}</p>
              <div className="modal-details">
                <p>
                  <strong>Credits:</strong> {modalCourse.credits}
                </p>
                <p>
                  <strong>Instructors:</strong> {modalCourse.instructors.join(', ')}
                </p>
                <p>
                  <strong>Semesters Offered:</strong>
                </p>
                <div className="modal-semesters">
                  {modalCourse.semesters.map((sem, idx) => (
                    <span key={idx} className={`semester ${sem}`}>
                      {sem === 'F'
                        ? 'Fall'
                        : sem === 'W'
                        ? 'Winter'
                        : sem === 'SP'
                        ? 'Spring'
                        : 'Summer'}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2025 BYU CS Courses. All rights reserved.</p>
        <p>Contact: webmaster@byu.edu | Address: Provo, UT 84602</p>
      </footer>
    </div>
  );
}

export default App;