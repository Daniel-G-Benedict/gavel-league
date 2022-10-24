 import './Book.css'
 


 const Book = () => {
   
// source : https://codepen.io/yoann-b/pen/jOLjjOP

   return ( <div>


<main>
	<div className="book">
		<div className="book-cover">
			<div>
				<booktitle>Miranda Rights</booktitle>
				<div className="separator"></div>
				<h2>By Dominique Douglas</h2>
			</div>
		</div>
		<div className="book-content">
			<h3>An Introduction to Miranda Rights</h3>

			<p><b>Miranda rights: </b>The set of rights that a person accused or suspected of having committed a specific offense has during interrogation and of which he or she must be informed prior to questioning, as stated by the U.S. Supreme Court in deciding Miranda v. Arizona and related cases.</p>
            
            <p><b>Miranda triggers:</b> The dual principles of custody and interrogation, both of which are necessary before an advisement of rights is required.</p>

            <p><b>Miranda warnings:</b> The advisement of rights due criminal suspects by the police prior to the beginning of questioning. Miranda warnings were first set forth by the U.S. Supreme Court in the 1966 case of Miranda v. Arizona.</p>
            <p>"You have the right to remain silent. Anything you say can be used against you in court. You have the right to talk to a lawyer for advice before we ask you any questions. You have the right to have a lawyer with you during questioning."</p>
            
            <h3>Case Law :  Miranda v. Arizona, 1966</h3>
            <p> In 1963, Ernesto Miranda was arrested in Phoenix, Arizona for stealing $8 from bank worker and charged with armed robbery. He already had a record for armed robbery, and a juvenile record including attempted rape, assault, and burglary. While in police custody he signed a written confession to the robbery, and to kidnapping and raping an 18-year- old woman 11 days before the robbery. After the conviction, his lawyers appealed, on the grounds that Miranda did not know he was protected from self-incrimination.</p>
            <p>The case, Miranda v. Arizona, made it all the way to the Supreme Court, where the conviction was overthrown. In a landmark ruling issued in 1966, the court established that the accused have the right to remain silent and that prosecutors may not use statements made by defendants while in police custody unless the police have advised them of their rights, commonly called the Miranda Rights. The case was later re-tried; Miranda was convicted on the basis of other evidence, and served 11 years. He was paroled in 1972, and died in 1976 at the age of 34, after being stabbed in a bar fight. A suspect was arrested but chose to exercise his right to remain silent, and was released.</p>

			</div>
	</div>
    <button onPointerDown={()=> {window.location.replace("./Game")}}> return to game </button>
</main>
    </div>
   )
}

export default Book;