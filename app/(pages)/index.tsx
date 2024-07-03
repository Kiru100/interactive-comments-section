import { Image } from 'expo-image';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rubik_400Regular, Rubik_500Medium, useFonts } from '@expo-google-fonts/rubik';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
	const [fontsLoaded] = useFonts({
		Rubik_400Regular,
		Rubik_500Medium
	});

	if (!fontsLoaded) {
	return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.comment}>
				<View style={styles.comment_details}>
					<Image
						style={styles.image}
						source="https://picsum.photos/seed/696/3000/2000"
						placeholder={{ blurhash }}
						contentFit="cover"
						transition={1000}
					/>
					<Text style={styles.user_name}>
						amyrobson
					</Text>
					<Text style={styles.comment_date}>
						1 month ago
					</Text>
				</View>
				<Text  style={styles.comment_content}>
					Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.
				</Text>
				<View style={styles.comment_actions}>
					<View style={styles.up_down_vote_container}>
						<TouchableOpacity>
							<Text>+</Text>
						</TouchableOpacity>
						<Text style={styles.up_down_vote_count}>1</Text>
						<TouchableOpacity>
							<Text>-</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 48,
		backgroundColor: '#F5F6FA',
	},
	comment_date:{
		color: "#67727E", 
		fontSize: 16,
		lineHeight: 24,
		fontFamily:"Rubik_400Regular"
	},
	user_name:{
		color: "#334253",
		fontSize: 16,
		fontFamily:"Rubik_500Medium"
	},
	image: {
		borderRadius: 50,
		height: 32,
		width: 32,
		backgroundColor: '#0553',
	},
	comment:{
		width: '100%',
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8
	},
	comment_details:{
		width: '100%',
		gap: 16,
		flexDirection:"row",
		alignItems:"center"
	},
	comment_content:{
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	comment_actions:{

	},
	up_down_vote_container: {
		flexDirection:"row",
		marginTop: 16,
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F6FA",
		width: "auto"
	},
	up_down_vote_count:{
		fontFamily:"Rubik_500Medium",
		fontSize: 16,
		width: 30,
		textAlign: "center"
	}
	
});