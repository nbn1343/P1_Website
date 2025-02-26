import React, { useState } from 'react';
import coursesData from './courseData';

function App() {
  const [modalCourse, setModalCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [creditHours, setCreditHours] = useState('All Credits');
  const [semester, setSemester] = useState('All Semesters');
  const [coursesPerPage, setCoursesPerPage] = useState(21);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [showCore, setShowCore] = useState(false);

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const [showFavorites, setShowFavorites] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setCourseLevel('All Levels');
    setCreditHours('All Credits');
    setSemester('All Semesters');
    setShowFavorites(false);
    setShowCore(false);
    setSortOrder('asc');
    setCurrentPage(1);
    setCoursesPerPage(21);
    setShowAllCourses(false);
  }

  const handleFilterReset = (setter, defaultValue) => {
    setter(defaultValue);
    setCurrentPage(1);
  };

  const filteredCourses = coursesData
    .filter((course) => {
      const levelMatch =
        courseLevel === 'All Levels' ||
        Math.floor(parseInt(course.header.match(/\d+/)[0]) / 100) * 100 ===
          parseInt(courseLevel);
      const creditMatch =
        creditHours === 'All Credits' || course.credits === parseInt(creditHours);
      const semesterMatch =
        semester === 'All Semesters' || course.semesters.includes(semester);
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

  const handleCourseLevelChange = (newCourseLevel) => {
    setCourseLevel(newCourseLevel);
    setCurrentPage(1); // Reset to the first page
  };

  const handleCreditHoursChange = (newCreditHours) => {
    setCreditHours(newCreditHours);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
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

  return (
    <div className="app-container">
      <header className="header">
        <h1>BYU CS Courses</h1>
        <p className="subtitle">Explore undergraduate Computer Science courses</p>
        <p className="results-count">
          Showing {displayedCourses.length} of {filteredCourses.length} courses
        </p>
      </header>

      <div className="three-column-layout">
        <aside className="filters-sidebar">
          <div className="filters">
            <div className="filter-group">
              <label>Search</label>
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

            <div className="filter-group">
              <label>Sort Courses</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSortOrderChange(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="filter-group">
            <label>Course Level</label>
            <select value={courseLevel} onChange={(e) => handleCourseLevelChange(e.target.value)}>
              <option>All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
            </select>
            {courseLevel !== 'All Levels' && (
              <button className="clear-button" onClick={() => handleFilterReset(setCourseLevel, 'All Levels')}>
                ×
              </button>
            )}
          </div>

            <div className="filter-group">
              <label>Credit Hours</label>
              <select value={creditHours} onChange={(e) => handleCreditHoursChange(e.target.value)}>
                <option>All Credits</option>
                {[...new Set(coursesData.map((c) => c.credits))]
                  .sort()
                  .map((credit) => (
                    <option key={credit} value={credit}>
                      {credit} credit{credit !== 1 ? 's' : ''}
                    </option>
                  ))}
              </select>
              {creditHours !== 'All Credits' && (
                  <button className="clear-button" onClick={() => handleFilterReset(setCreditHours, 'All Credits')}>
                    ×
                  </button>
                )}
            </div>

            <div className="filter-group">
              <label>Semester</label>
              <select value={semester} onChange={(e) => handleSemesterChange(e.target.value)}>
                <option>All Semesters</option>
                <option value="F">Fall</option>
                <option value="W">Winter</option>
                <option value="SP">Spring</option>
                <option value="SU">Summer</option>
              </select>
              {semester !== 'All Semesters' && (
                  <button className="clear-button" onClick={() => handleFilterReset(setSemester, 'All Semesters')}>
                    ×
                  </button>
                )}
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