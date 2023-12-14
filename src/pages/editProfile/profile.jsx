import React from 'react'
import './style.css'

function profile() {
  return (
    <div>
      <div className="container light-style flex-grow-1 container-p-y">
        <div className="top">
            <img className="logos" src="logo.png" alt="logo" />
            <h4 className="font-weight-bold py-3 mb-4">
                <b>Account Settings</b>
            </h4>
        </div>
        <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
                <div className="col-md-3 pt-0">
                    <div className="list-group list-group-flush account-settings-links">
                        <a className="list-group-item list-group-item-action active" data-toggle="list"
                            href="account-general">General</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="account-change-password">Change password</a>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade active show" id="account-general">
                            <div className="card-body media align-items-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt
                                    className="d-block ui-w-80"/>
                                <div className="media-body ml-4">
                                    <label className="btn btn-outline-primary">
                                        Upload new photo
                                        <input type="file" className="account-settings-fileinput"/>
                                    </label> &nbsp;
                                    <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                    <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                </div>
                            </div>
                            <hr className="border-light m-0"/>
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control mb-1" value="User"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value="User" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">E-mail</label>
                                    <input type="text" className="form-control mb-1" value="User@gmail.com"/>
                                    <div className="alert alert-warning mt-3">
                                        Your email is not confirmed. Please check your inbox.<br/>
                                        <a href="javascript:void(0)">Resend confirmation</a>
                                    </div>
                                </div>
           
                            </div>
                        </div>
                        <div className="tab-pane fade" id="account-change-password">
                            <div className="card-body pb-2">
                                <div className="form-group">
                                    <label className="form-label">Current password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Repeat new password</label>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-right mt-3">
            <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
            <button type="button" className="btn btn-default">Cancel</button>
        </div>
    </div>
    </div>
  )
}

export default profile