import { StyleSheet,FlatList,Image,SafeAreaView,TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import { Layout,Text,Input,Icon} from '@ui-kitten/components';
import { useNavigation } from "@react-navigation/native";
import {connect, useSelector} from 'react-redux';
import { db } from '../../firebase';
import {PageLoader} from '../PScreen/PageLoader';
const SearchIcon = props => <Icon {...props} name="search" />;
const DPatientChat = () => {
  const auth = useSelector((state) => state.auth);
    const navigation = useNavigation();
    const [patientList, setPatientList] = useState([])
      const [searchValue, setSearchValue] = useState("")
      const [searchData, setSearchData] = useState(patientList)
      const [loading, setLoading] = useState(true)
      const handleSearch = (value) => {
        const filtered = patientList.filter((_data) => _data?.name?.toLowerCase().includes(value?.toLowerCase()));
        return setSearchData(filtered);
    };
    const loadDoctors = () => {

      db.collection("usersCollections").where("role", "==", "patient").where("myDoctor", "==",auth?.user?.id )
      .get()
      .then((querySnapshot) => {
        const availpatients = [];
          querySnapshot.forEach((doc) => {

            var newDoc = {
              index: doc.id,
              name: doc.data().fullname,
              msg: "",
              image: doc.data().image?doc.data().image:require('../../assets/user2.png'),
            }
            availpatients.push(newDoc);
            
          });
          setPatientList(availpatients);
          setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
          console.log("Error getting documents: ", error);
      });
    }
    useEffect(() => {loadDoctors()} ,[])

      useEffect(() => {
        handleSearch(searchValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])
    useEffect(() => {
      setSearchData(patientList)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientList])
  return (
    loading ? <PageLoader /> : 
    <Layout style={{height:"100%"}}>
    <Layout style={styles.mainHead}>
    <Layout style={styles.headTop}>
    <Icon
    name='arrow-back'
    fill="#0075A9"
    style={styles.icon}
    onPress={() => navigation.navigate('DHome')}
    />
    <Text style={styles.pText}>Your Chat History</Text>
    </Layout>
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
      <Text style={{fontSize:20,fontFamily:"Recoleta-Bold",marginTop:30}}>Chat List</Text>
      <SafeAreaView>
      <FlatList style={styles.textStyle}
          keyExtractor={item => item.index}
          vertical
          //inverted
          showsVerticalScrollIndicator={false}
          data={searchData}
          extraData={searchData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              onPress={() => navigation.navigate('DChat', { thread: item })}
            >
                <Layout style={styles.card}>
                  <Image
                    source={item.image}
                    resizeMode="cover" style={{ height: 60, width: 60, borderRadius: 50,marginTop:10 }}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.msg}>{item.msg}</Text>
                  <Text style={styles.noti}>{item.notification}</Text>
                  {/* <Text style={styles.details}>View Details</Text> */}
                  <Text style={styles.msgNow}>Message Now</Text>
                </Layout>
                </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </Layout>
    </Layout>
  )
}

 

const styles = StyleSheet.create({
    mainHead:{
        marginHorizontal:30,
    },
    input: {
        borderRadius: 30,
        fontFamily: "GTWalsheimPro-Regular"
    },
    icon:{
        height:30,
        width:30
    },
    headTop:{
        display:'flex',
        flexDirection:"row",
        marginTop:30
    },
    pText:{
        fontSize:20,
        fontFamily:"Recoleta-Bold",
        left:10
    },
    Search:{
        marginTop:20
    },
    card:{
        display:"flex",
        flexDirection:"column",
        backgroundColor: "#F9F9F9",
        width:"100%",
        marginTop:15,
        padding:15,
        paddingBottom:20,
    },
    text:{
        position:"absolute",
        marginTop:10,
        marginLeft:90,
        fontSize:18,
        fontFamily:"GTWalsheimPro-Bold",
    },
    msg:{
        position:"absolute",
        marginTop:40,
        marginLeft:90,
        color:"#D5D5D5",
        fontSize:16,
    },
    noti:{
        position:"absolute",
        right:10,
        backgroundColor:"#FF6969",
        color:"white",
        width:30,
        height:30,
        borderRadius:50,
        paddingTop:4,
        textAlign:"center",
        fontSize:15,
        marginTop:-10
    },
    details:{
        marginTop:20,
        marginHorizontal:75,
        fontSize:15,
        color:"#0075A9",
        fontFamily:"GTWalsheimPro-Bold",
    },
    msgNow:{
        position:"absolute",
        bottom:20,
        right:10,
        fontSize:15,
        fontFamily:"GTWalsheimPro-Bold"
    }
})
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default DPatientChat;
