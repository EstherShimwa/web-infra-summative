document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchQuery = input.value.trim().toLowerCase();
    if (!searchQuery) return;

    resultsContainer.innerHTML = `<p>Loading...</p>`;

    try {
      const response = await fetch(`http://localhost:3000/api/exercises?search=${searchQuery}`);
      const data = await response.json();

      if (data.error || !Array.isArray(data) || data.length === 0) {
        resultsContainer.innerHTML = `<p>No exercises found. Try something else.</p>`;
        return;
      }

      displayExercises(data);
    } catch (error) {
      console.error('Frontend fetch error:', error);
      resultsContainer.innerHTML = `<p>Failed to load exercises. Try again later.</p>`;
    }
  });

  function displayExercises(data) {
    resultsContainer.innerHTML = '';

    data.slice(0, 12).forEach(exercise => {
      const card = document.createElement('div');
      card.className = 'exercise-card';

      card.innerHTML = `
        <h3>${exercise.name}</h3>
        <p><strong>Target:</strong> ${exercise.target}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <button class="view-more-btn">View More</button>
      `;

      card.querySelector('.view-more-btn').addEventListener('click', () => {
        showModal(exercise);
      });

      resultsContainer.appendChild(card);
    });
  }

  function showModal(exercise) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${exercise.name}</h2>
        <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
        <p><strong>Target Muscle:</strong> ${exercise.target}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-btn').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        modal.remove();
      }
    });
  }
});
