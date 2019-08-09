import React, { Component } from "react";

class FormMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            picture: "",
            comment: ""
        };
        this.onChange = this.onChange.bind(this);
        this.submitMovie = this.submitMovie.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitMovie(e) {
        e.preventDefault();
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        };
        const url = "http://campus-bordeaux.ovh:3001/api/quests/movies/";
        fetch(url, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error);
                } else {
                    alert(`Film ajouté avec l'ID ${res}!`);
                }
            }).catch(e => {
                console.error(e);
                alert("Erreur lors de l'ajout d'un film");
            });
    }

    render() {
        return (
            <div className="FormMovie">
                <h1>Saisie d'un film</h1>
                <form onSubmit={this.submitMovie}>
                    <fieldset>
                        <legend>Informations</legend>
                        <div className="form-data">
                            <label htmlFor="title">Titre</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title}
                                required
                            />
                        </div>
                        <div className="form-data">
                            <label htmlFor="picture">Lien vers le Poster</label>
                            <input
                                type="text"
                                id="picture"
                                name="picture"
                                onChange={this.onChange}
                                value={this.state.picture}
                                required
                            />
                        </div>
                        <div className="form-data">
                            <label htmlFor="comment">Vos commentaires</label>
                            <textarea
                                type="text"
                                id="comment"
                                name="comment"
                                rows="10"
                                onChange={this.onChange}
                                placeholder="pourquoi aimez-vous ce film, pourquoi vous a-t-il marqué..."
                                value={this.state.comment}
                                required
                            >{this.state.comment}</textarea>
                        </div>
                        <hr />
                        <div className="form-data">
                            <input type="submit" value="Envoyer" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default FormMovie;