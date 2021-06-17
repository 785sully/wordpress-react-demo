import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function Posts() {
	const [posts, setPosts] = useState([]);

	async function getData() {
		const url = 'https://3b3d8d4ea4.nxcli.net/wp-json/wp/v2/posts';
		try {
			const res = await fetch(url);
			const data = await res.json();
			return data;
		} catch (err) {
			console.error(err);
		}
		// fetch(url)
		// 	.then((response) => response.json)
		// 	.then((posts) => setPosts(posts))
		// 	.catch((error) => console.error(error));
		// console.log(posts);
	}

	useEffect(() => {
		getData().then((postData) => setPosts(postData));
	}, []);
	const useStyles = makeStyles({
		gridItem: {
			marginBottom: '3em',
		},
	});
	const classes = useStyles();
	return (
		<Grid justify='center' alignItems='center' container>
			{posts.map((post, id) => (
				<Grid item xs={12} key={id} className={classes.gridItem}>
					<Card>
						<CardContent>
							<Typography
								color='textSecondary'
								variant='h1'
								component='h2'
								dangerouslySetInnerHTML={{
									__html: post.title.rendered,
								}}
							/>
							<Typography
								variant='body2'
								component='p'
								dangerouslySetInnerHTML={{
									__html: post.content.rendered,
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
