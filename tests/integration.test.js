import request from 'supertest';
import app from '../index.js';

describe('Movies API Integration Test', () => {
    it('should return the correct movie title on the movie page', async () => {
       
        const res = await request(app).get('/test/movies');
        expect(res.status).toBe(200);
        console.log(res.body); 

    
        const movies = res.body.movies;
        console.log(movies); 
        expect(Array.isArray(movies)).toBe(true);

        // Loop to check if all the movies are rendered correctly
        for (const movie of movies) {
            const movieId = movie.id;
            const movieTitle = movie.attributes.title;

            
            const movieRes = await request(app).get(`/movies/${movieId}`);
            expect(movieRes.status).toBe(200);

            
            expect(movieRes.text).toContain(`<h1>${movieTitle}</h1>`);
        }
    });
});