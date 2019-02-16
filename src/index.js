const app = document.getElementById('app');
const ghApiUrl = 'https://github-trending-api.now.sh/repositories?language=javascript&since=weekly';
const CNApiUrl = 'https://api.chucknorris.io/jokes/random';

app.innerHTML = `
    <div style="text-align: center;">
      <h1 style="margin-bottom: 2em;">Le Repo più famose</h1>
      <p id="CNSentence">A roundhouse kick!!!</p>
      <div style="display: flex; justify-content: center">
        <button id="get-repo">Prendi le Repositories</button>
      </div>
      <div id="repo-boxes" style="display: flex; justify-content: space-between; flex-wrap: wrap;"></div>
    </div>
`;

function createBox({
  author, url, name, stars, forks, language,
}) {
  const box = document.createElement('div');
  box.className = 'repo-box';

  box.innerHTML = `
    <a target="_blank" href="${url}" class="url">${name}</a>
    <p class="stars">Stars: ${stars}, Fork: ${forks}</p>
    <p class="language">Linguaggio: ${language}</p>
    <p class="author">Autore: ${author}</p>
    <button class="remove">x</button>
  `;

  return box;
}

const getRepo = document.getElementById('get-repo');
const repoBoxes = document.getElementById('repo-boxes');
const chuckNorrisBox = document.getElementById('CNSentence');

repoBoxes.addEventListener('click', (e) => {
  if (e.target && e.target.className === 'remove') {
    e.target.parentNode.remove();
  }
}, false);

getRepo.addEventListener('click', async () => {
  try {
    // const repos = await (await fetch(ghApiUrl)).json();

    const myProms = [
      await (await fetch(ghApiUrl)).json(),
      await (await fetch(CNApiUrl)).json(),
    ];

    const [repos, chuckNorris] = await Promise.all(myProms);

    repoBoxes.innerHTML = '';
    chuckNorrisBox.innerHTML = `${chuckNorris.value}`;


    repos.forEach((repo) => {
      repoBoxes.appendChild(createBox(repo));
    });
  } catch (e) {
    console.error(e);
  }
});
