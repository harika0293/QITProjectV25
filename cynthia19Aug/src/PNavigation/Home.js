import { StyleSheet, Image, FlatList } from 'react-native'
import React, { useState, useEffect,useLayoutEffect } from 'react'
import { Layout, Text, Input, Icon } from '@ui-kitten/components'
import {useDispatch} from 'react-redux';
import { db} from '../../firebase';
import {useSelector} from 'react-redux'
import {PageLoader} from '../PScreen/PageLoader';
// import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

const SearchIcon = props => <Icon {...props} name="search" />;
const Home = ({navigation}) => {
  const authUser = useSelector((state) => state.auth);
    const initialList = [
        {
            index: "cough_count",
            name: "Number of Cough",
            image: require("../../assets/Group.png"),
            steps: "00"
        },
        {
            index: "night_waking",
            name: "Number of Night Waking",
            image: require("../../assets/fa6-solid_person-walking.png"),
            steps: "00"
        },
        {
            index: "drink_count",
            name: "Number of Drinking",
            image: require("../../assets/gg_glass-alt.png"),
            steps: "00"
        },
        {
            index: "fall_count",
            name: "Number of Falls",
            image: require("../../assets/fa6-solid_person-falling.png"),
            steps: "00"
        },
    ]
    const [loading, setLoading] = React.useState(true);
    
    const [list, setList] = React.useState(initialList);
    const loadAnalysis = () => {
       var date = moment(new Date()).format('MM/DD/YYYY')
        setLoading(true);
        db.collection("usersCollections").doc(authUser.user.id).collection('activities').where("date", "==", date)
        .get()
        .then(function (doc) {
            if (doc.empty) {

                setLoading(false);
                alert("No data found")
            }
            else {
            const newList = list.map((item) => {
                if (doc.data()[item.index]) {
                  const updatedItem = {
                    ...item,
                    steps: doc.data()[item.index],
                  };
          
                  return updatedItem;
                }
          
                return item;
              });
                setList(newList);
                setLoading(false);
            }
          }).catch((error) => {
          setLoading(false);
            console.log("Error getting documents: ", error);
        });
      }
    // const getFilter1 = () => {
    //     axios.post('https://data-api-obpornrv3a-uc.a.run.app/activities_api', {
    //       date: '07/05/2022'
    //     })
    //       .then(function (response) {
    //         const data = response.data;
    //         const newList = list.map((item) => {
    //             if (data[item.index]) {
    //               const updatedItem = {
    //                 ...item,
    //                 steps: data[item.index],
    //               };
          
    //               return updatedItem;
    //             }
          
    //             return item;
    //           });
          
    //           setList(newList);
    //             setLoading(false);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    
    //   }
    useLayoutEffect(() => {
        loadAnalysis();
      }, [])
      const [searchValue, setSearchValue] = useState("")
      const [searchData, setSearchData] = useState(list)
      const handleSearch = (value) => {
        const filtered = list.filter((_data) => _data?.name?.toLowerCase().includes(value?.toLowerCase()));
        return setSearchData(filtered);
    };
   
    useEffect(() => {
       setSearchData(list)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])
      useEffect(() => {
        handleSearch(searchValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])
    return (
        loading ? <PageLoader/> : 
        
        <Layout style={styles.Container}>
          
        <Layout style={styles.mainHeader}>
        <Layout style={styles.TopHead}>
        <Text style={{ marginTop: 30, fontSize: 18 }}>Hello!</Text>
        <Icon style={styles.user}
        name="person-outline"
        fill='#8F9BB3'
        />
        <Icon name='settings-outline'
        style={styles.setting}
        fill="#0075A9"
        onPress={() => navigation.navigate('PSetting')}/>
    </Layout>
        
    <Text style={{ fontSize: 30, fontFamily: "Recoleta-Bold", color: "#0075A9" }}>{authUser.user.fullname}</Text>
    <Layout style={styles.Search}>
        <Input
            placeholder='Search....'
            accessoryRight={SearchIcon}
            value={searchValue}
            onChangeText={newText => setSearchValue(newText)}
            style={styles.input}
            size="large"
        />
    </Layout>
    <Text style={styles.text}>Today's <Text style={{ fontSize: 25, fontFamily: "Recoleta-Bold", color: "#0075A9" }}>Analytics</Text></Text>
    <FlatList
        style={styles.listStyle}
        keyExtractor={(key) => {
            return key.index;
        }}
        //horizontal
        //inverted
        //showsHorizontalScrollIndicator={false}
        extraData={searchData}
        numColumns={2}
        data={searchData}
        renderItem={({ item }) => {
            return <>
                <Layout style={styles.textStyle}>
                    <Image source={item.image} resizeMode="contain" style={styles.imageCard} />
                    <Text style={{ maxWidth: 100, color: "#000", fontSize: 17, textAlign: "center", paddingTop: 10, fontWeight: "500" }}>{item.name}</Text>
                    <Text style={{ backgroundColor: "#0075A9", fontSize: 22, color: "white", fontWeight: "bold", paddingLeft: 20, paddingRight: 20, marginTop: 10, marginBottom: 10,borderRadius:5 }}>
                        {item.steps}
                    </Text>
                </Layout>
            </>
        }}
    />
        </Layout>
       
        </Layout>
      
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });
  
  export default Home;

const styles = StyleSheet.create({
    Container: {
        height: '100%',
        
    },
    mainHeader:{
        marginHorizontal:30
    },
    TopHead: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
       
    },
    user: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginLeft: 200,
    },
    Search: {
        marginTop: 30,
    },
    input: {
        borderRadius: 30,
        fontFamily: "GTWalsheimPro-Regular"
    },
    text: {
        marginTop: 30,
        fontSize: 25,
        fontFamily: "Recoleta-Bold",
    },
    textStyle: {
        padding: 10,
        backgroundColor: "#EEF5F9",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 130,
        borderRadius: 10
    },
    listStyle: {
        textAlign: "center",
        padding: 10,
        margin: 0,
    },
    menuStyle: {
        paddingBottom: 30
    },
    lineStyle: {
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: "grey",
    },
    imageCard: {
        width: 50,
        height: 50,
        marginTop: 7,
    },
    setting:{
        width:30,
        height:30,
        position:'absolute',
        marginTop:90,
        right:20
    }
})