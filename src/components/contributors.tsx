import './contributors.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

/*
 * List made just in case someone wants to contribute to the repo but remain
 * anonymous in the website.
 */
const anonList = [];

const Contributors = () => {
  const [contrib, setContributors] = useState([]);

  useEffect(() => {
    async function getContributors() {
       getContributorsJson()
    }
    getContributors()
  }, [])
  
  const getContributorsJson = () => {
     axios.get(
      'https://api.github.com/repos/SporeFinance/Spore-frontend/contributors'
    ).then( res =>{
      setContributors(
        res.data.filter(
          function (contributor) {
             return !anonList.includes(contributor.login);
          }
        )
      );
    });
  }

  return (
    <>
      <div className='col-md-12'>
        {
          contrib.map( (data:any) => {
           return <div className='contributor-style'>
              <a href={data.html_url} target="_blank" rel="noreferrer">
                <img src={data.avatar_url} alt=''/>
                <span>{data.login}</span>
              </a>
            </div>
          })          
        }
      </div>
    </>
  );
  
};
export default Contributors;