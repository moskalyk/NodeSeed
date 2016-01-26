naicsSchema = new db.Schema({
	NAICS		: String,
	Industry	: String,
	Letter 		: String,
	Companies	: [{type: db.Schema.Types.ObjectId, ref: 'Company'}]
})

