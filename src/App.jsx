import React, { useState } from 'react';

const coursesData = [
  {
    id: 'cs111',
    header: 'CS 111',
    title: 'Intro to Computer Science',
    description:
      'Teaches how to design, develop, reason about, and test programs. Topics include data types, control structures, functions, objects, basic algorithms, and problem-solving strategies.',
    credits: 3,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs180',
    header: 'CS 180',
    title: 'Intro to Data Science',
    description:
      'Statistics; linear algebra; machine learning; data cleaning and visualization.',
    credits: 3,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs202',
    header: 'CS 202',
    title: 'Software Engineering Lab 1',
    description:
      'The first of three experiential learning labs that will provide students with hands-on experience.',
    credits: 1,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs203',
    header: 'CS 203',
    title: 'Software Engineering Lab 2',
    description:
      'The second of three experiential learning labs that will provide students with hands-on experience.',
    credits: 1,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs204',
    header: 'CS 204',
    title: 'Software Engineering Lab 3',
    description:
      'The third of three experiential learning labs that will provide students with hands-on experience.',
    credits: 1,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs224',
    header: 'CS 224',
    title: 'Computer Systems',
    description:
      'How a computer works to execute sequential code: low level data representation and instruction processing.',
    credits: 3,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs235',
    header: 'CS 235',
    title: 'Data Structures',
    description:
      'Fundamental data structures and algorithms; basic algorithm analysis.',
    credits: 3,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs236',
    header: 'CS 236',
    title: 'Discrete Structure',
    description:
      'Introduction to grammars and parsing; predicate and propositional logic; proof techniques.',
    credits: 3,
    semesters: ['F', 'W', 'SP', 'SU'],
  },
  {
    id: 'cs312',
    header: 'CS 312',
    title: 'Algorithm Design and Analysis',
    description:
      'Advanced algorithm analysis, design techniques, graph algorithms, probabilistic algorithms, and parallel computing.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs324',
    header: 'CS 324',
    title: 'Systems Programming',
    description:
      'Operating systems, concurrent programming, process management, memory management, file systems, and networking.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs340',
    header: 'CS 340',
    title: 'Software Design & Testing',
    description:
      'Software development methodologies, object-oriented design patterns, testing strategies, and software maintenance.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  // Additional 300-level courses
  {
    id: 'cs330',
    header: 'CS 330',
    title: 'Programming Languages',
    description:
      'Programming language paradigms, syntax and semantics, type systems, functional programming, and language implementation techniques.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs345',
    header: 'CS 345',
    title: 'Operating Systems Design',
    description:
      'Process management, memory allocation, file systems, device management, and distributed systems concepts.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs355',
    header: 'CS 355',
    title: 'Interactive Graphics',
    description:
      '2D graphics programming, user interface design, event handling, and interactive applications development.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  // Additional 400-level courses
  {
    id: 'cs450',
    header: 'CS 450',
    title: 'Computer Graphics',
    description:
      '3D graphics, rendering, geometric modeling, animation, visualization techniques, and graphics programming.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs465',
    header: 'CS 465',
    title: 'Computer Security',
    description:
      'Cryptography, network security, authentication, access control, and software security principles.',
    credits: 3,
    semesters: ['F', 'W'],
  },
  {
    id: 'cs470',
    header: 'CS 470',
    title: 'Artificial Intelligence',
    description:
      'Machine learning, neural networks, natural language processing, and expert systems development.',
    credits: 3,
    semesters: ['F', 'W'],
  },
];


function App() {
  const [modalCourse, setModalCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [creditHours, setCreditHours] = useState('All Credits');
  const [semester, setSemester] = useState('All Semesters');
  const coursesPerPage = 10;

  const [favorites, setFavorites] = useState([]);

  const [showFavorites, setShowFavorites] = useState(false);

  const filteredCourses = coursesData.filter(course => {
    const levelMatch = courseLevel === 'All Levels' || 
      Math.floor(parseInt(course.header.match(/\d+/)[0])/100)*100 === parseInt(courseLevel);
    const creditMatch = creditHours === 'All Credits' || course.credits === parseInt(creditHours);
    const semesterMatch = semester === 'All Semesters' || course.semesters.includes(semester);
    const searchMatch = course.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const favoritesMatch = !showFavorites || favorites.includes(course.id);
  
    return levelMatch && creditMatch && semesterMatch && searchMatch && favoritesMatch;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const displayedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const toggleFavorite = (courseId) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.includes(courseId)) {
        return currentFavorites.filter(id => id !== courseId);
      } else {
        return [...currentFavorites, courseId];
      }
    });
  };



  const openModal = (course) => setModalCourse(course);
  const closeModal = () => setModalCourse(null);

  return (
    <div className="app-container">
      <header className="header">
        <h1>BYU CS Courses</h1>
        <p className="subtitle">Explore undergraduate Computer Science courses</p>
        <p className="results-count">
          Showing {displayedCourses.length} of {filteredCourses.length} courses
        </p>
      </header>

      <div className="main-content">
        <aside className="filters">
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
                <button className="clear-button" onClick={() => setSearchTerm('')}>×</button>
              )}
            </div>
          </div>

          <div className="filter-group">
            <label>Course Level</label>
            <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
              <option>All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Credit Hours</label>
            <select value={creditHours} onChange={(e) => setCreditHours(e.target.value)}>
              <option>All Credits</option>
              {[...new Set(coursesData.map(c => c.credits))].sort().map(credit => (
                <option key={credit} value={credit}>{credit} credit{credit !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Semester</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option>All Semesters</option>
              <option value="F">Fall</option>
              <option value="W">Winter</option>
              <option value="SP">Spring</option>
              <option value="SU">Summer</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Show Favorites</label>
            <input
              type="checkbox"
              checked={showFavorites}
              onChange={() => setShowFavorites(f => !f)}
            />
          </div>
        </aside>

        <main className="courses-container">
          <div className="courses-scroll">
            <div className="courses-grid">
              {displayedCourses.map((course) => (
                <div className="course-card" key={course.id}>
                <div className="card-header">
                  <h3>{course.header}</h3>
                  <span className="credits">{course.credits} credits</span>
                  <button 
                    className={`favorite-button ${favorites.includes(course.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(course.id)}
                  >
                    {favorites.includes(course.id) ? '★ Unfavorite' : '☆ Favorite'}
                  </button>
                </div>
                <h4>{course.title}</h4>
                <p className="description">{course.description.substring(0, 120)}...</p>
                <div className="semester-badges">
                  {course.semesters.map((sem, idx) => (
                    <span key={idx} className={`semester ${sem}`}>{sem}</span>
                  ))}
                </div>
                <button className="more-button" onClick={() => openModal(course)}>Details</button>
              </div>
              ))}
            </div>
          </div>

          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {modalCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{modalCourse.header}: {modalCourse.title}</h2>
            <button
                className={`favorite-button ${favorites.includes(modalCourse.id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(modalCourse.id)}
              >
                {favorites.includes(modalCourse.id) ? '★ Unfavorite' : '☆ Favorite'}
            </button>
            <p className="modal-description">{modalCourse.description}</p>
            <div className="modal-details">
              <p><strong>Credits:</strong> {modalCourse.credits}</p>
              <p><strong>Semesters Offered:</strong></p>
              <div className="modal-semesters">
                {modalCourse.semesters.map((sem, idx) => (
                  <span key={idx} className={`semester ${sem}`}>
                    {sem === 'F' ? 'Fall' : sem === 'W' ? 'Winter' : sem === 'SP' ? 'Spring' : 'Summer'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


