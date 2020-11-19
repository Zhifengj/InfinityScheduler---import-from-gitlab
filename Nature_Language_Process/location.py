import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# sent_tokenize: split sentences
# word_tokenize: split words
# stopword: delete unuseful words like "a, in"


example_text = input("Enter text:")
stop_words = set(stopwords.words("english"))

sentence_list = sent_tokenize(example_text)

word_list = []

for sen in sentence_list:
    unfiltered_words = word_tokenize(sen)
    filtered_words = [w for w in unfiltered_words if w not in stop_words]
    st = []
    for i in filtered_words:
        words = word_tokenize(i)
        tagged = nltk.pos_tag(words)
        st.append(tagged[0])
    word_list.append(st)

print("List of word:")
print(word_list)

noun_list = []
for sen in word_list:
    nouns = [w[0] for w in sen if w[1] == 'NN' or w[1] == 'NNP']
    noun_list.append(nouns)

print("List of nouns and proper noun:")
print(noun_list)


place_list = ["school","cafe","starbuck","foorball field","soccer field","restaurant","gym","city","town","capital","metropolis",
        "village","hamlet","settlement","port","resort","center","downtown","suburb","outskirts","slums","ghetto","region",
        "district","neighborhood","borough","block","limit","area","quarter","place","location","site","locality","vicinity",
        "environment","surroundings","street","road","avenue","alley","boulevard","lane","drive","route","thoroughfare",
        "byroad","byway","by pass","path","track","trail","passage","driveway","highway","speedway","expressway","freeway",
        "parkway","causeway","turnpike","autobahn","motorway","superhighway","intersection","crossroads","junction","crossing",
        "crosswalk","sidewalk","pavement","walkway","corner","overpass","underpass","bridge","tunnel","busstop","parking",
        "station","garage","house","brownstone","building","cottage","cabin","bungalow","hut","lodge","castle","palace","villa",
        "estate","mansion","fortress","farmhouse","tower","hospital","supermarket","store","hotel","bank","office","museum",
        "library","movie","theater","factory","plant","department","hall","prison","jail","church","cathedral","temple","chapel",
        "mosque","synagogue","park","club","garden","square","showroom","monument","plaza","zoo","aviary","planetarium","cinema",
        "circus","disco","discotheque","inn","motel","lodge","lodging","lodgings","cafeterua","lunchroom","luncheonette",
        "tearoom","diner","eatery","canteen","grillroom","bar","barroom","pub","tavern","saloon","ATM","mall","bookstore",
        "bakery","fair","market","bazaar","newsstand","playground","campground","pool","stadium","clinic","polyclinic","room",
        "zoom","pharmacy","drugstore","kingdergarten","college","academy","campus","dormitory","shop","parlor","solarium",
        "agency","rental","laundry","laundromat","repair"]

places = set()

print("Locations:")
for ls in noun_list:
    for l in ls:
        for w in l:
            if l.lower() in place_list:
                places.add(l)

print(places)


# Some commonly words of the location
#https://usefulenglish.ru/vocabulary/places-in-the-city





#Note
#from nltk.stem import PorterStemmer
#ps = PorterStemmer() "python pythoning pythoner"

# POS Tag list
# CC coordinating conjunction
# CD cardinal digit
# DT determiner
# EX existential there (like: “there is” … think of it like “there exists”)
# FW foreign word
# IN preposition/subordinating conjunction
# JJ adjective ‘big’
# JJR adjective, comparative ‘bigger’
# JJS adjective, superlative ‘biggest’
# LS list marker 1)
# MD modal could, will
# NN noun, singular ‘desk’
# NNS noun plural ‘desks’
# NNP proper noun, singular ‘Harrison’
# NNPS proper noun, plural ‘Americans’
# PDT predeterminer ‘all the kids’
# POS possessive ending parent‘s
# PRP personal pronoun I, he, she
# PRP$ possessive pronoun my, his, hers
# RB adverb very, silently,
# RBR adverb, comparative better
# RBS adverb, superlative best
# RP particle give up
# TO to go ‘to‘ the store.
# UH interjection errrrrrrrm
# VB verb, base form take
# VBD verb, past tense took
# VBG verb, gerund/present participle taking
# VBN verb, past participle taken
# VBP verb, sing. present, non-3d take
# VBZ verb, 3rd person sing. present takes
# WDT wh-determiner which
# WP wh-pronoun who, what
# WP$ possessive wh-pronoun whose
# WRB wh-abverb where, when
