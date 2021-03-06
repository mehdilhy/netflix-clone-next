import Banner from "../Components/Banner";
import Row from "../Components/Row";
import Nav from "../Components/Nav";

import requests from "../Components/requests";
export default function Home() {
  return (
    <div className="bg-black">
      <meta
        name="google-site-verification"
        content="GrVU-DMFX9QnLlc0VrmY85rKEneEmxoGP6ycD4VHA7M"
      />
      <Nav />
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />{" "}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
    </div>
  );
}

export async function getStaticProps() {
  const data = "hi";

  return { props: { data } };
}
